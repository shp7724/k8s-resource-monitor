from k8s.serializers import Serializer
from k8s.utils import k8s
from rest_framework.views import APIView
from rest_framework.response import Response


class ListNode(APIView):
    def get(self, request):
        node_list = k8s.core.list_node()
        data = [Serializer.node(node) for node in node_list.items]
        return Response(data)
