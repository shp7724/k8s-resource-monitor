FROM python:3.9.9-alpine3.15

ADD ./requirements.txt /app/requirements.txt

RUN python -m venv /env
RUN /env/bin/pip install -r /app/requirements.txt

ADD . /app
WORKDIR /app

ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "config.wsgi"]
