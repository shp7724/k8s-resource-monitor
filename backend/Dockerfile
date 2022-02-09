FROM python:3.9.9-slim

ADD ./requirements.txt /app/requirements.txt

RUN python -m venv /env
RUN /env/bin/pip install -r /app/requirements.txt

ADD . /app
WORKDIR /app

ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "config.asgi:application"]
