import json
from channels.generic.websocket import *
from .utils import k8s
from threading import Thread
from kubernetes.stream import stream


class StreamThread(Thread):
    def __init__(self, websocket: AsyncWebsocketConsumer, stream) -> None:
        Thread.__init__(self)
        self.websocket = websocket
        self.stream = stream

    def run(self):
        while self.stream.is_open():
            if self.stream.peek_stdout():
                stdout = self.stream.read_stdout()
                self.websocket.send(stdout)
            if self.stream.peek_stderr():
                stderr = self.stream.read_stderr()
                self.websocket.send(stderr)
        else:
            self.websocket.close()


class PodSSHConsumer(WebsocketConsumer):
    def connect(self):
        self.namespace = self.scope["url_route"]["kwargs"]["namespace"]
        self.container_name = self.scope["url_route"]["kwargs"]["container_name"]
        self.pod_name = self.scope["url_route"]["kwargs"]["pod_name"]
        self.stream = k8s.get_ssh_stream(
            namespace=self.namespace,
            pod_name=self.pod_name,
            container_name=self.container_name,
        )
        thread = StreamThread(websocket=self, stream=self.stream)
        thread.start()
        self.accept()

    def disconnect(self, code):
        self.stream.write_stdin("exit\r")

    def receive(self, text_data=None, bytes_data=None):
        self.stream.write_stdin(text_data)
