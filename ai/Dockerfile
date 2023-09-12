FROM python:3.9
ENV PORT 3000
ENV DEBUG 0
RUN apt-get update && apt-get install -y
WORKDIR /usr/src/ai
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN unzip -o model_save.zip
CMD gunicorn -b 0.0.0.0:$PORT main:app