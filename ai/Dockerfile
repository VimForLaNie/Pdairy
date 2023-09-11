FROM tensorflow/tensorflow:latest
ENV PORT 3000
RUN apt-get update && apt-get install -y
WORKDIR /usr/src/ai
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "main.py"]