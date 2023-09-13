from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from scipy.optimize import minimize
import os

port = int(os.environ.get("PORT", 3000))
debug = int(os.environ.get("DEBUG", 0))
default_food = 1000

n_size = 305
model = tf.keras.models.load_model('model_save')
zeros_like = np.zeros(n_size)
ts = []
init_guess = [-30]
bnd = [(-n_size, n_size) for i in range(len(ts))]
def objective(lags):
    lags = np.round(lags)
    total_series = zeros_like.copy()
    for i, lag in enumerate(lags):
        lag = int(lag)
        if lag > 0:
          total_series[lag:] += ts[i][:-lag]
        elif lag < 0:
          total_series[:lag] += ts[i][-lag:]
    return np.var(total_series)

app = Flask(__name__)
@app.route('/predict_milk', methods=['POST'])
def predict_milk():
    '''
    POST JSON data with 'data': []
    like [1,2,3,3,3]

    Returns: JSON array with shape n_size [1,2,3,.....]
    '''
    data = request.get_json(force=True)
    val = np.array(data['data'])
    size = len(val)
    pl = n_size - size
    if val.shape != (n_size,):
        val = np.pad(val, (0, pl), 'constant')
    d = val.reshape(1, n_size)
    predictions = model.predict([d])[0].reshape(n_size)
    predictions[:size] = val[:size]
    return jsonify(predictions.tolist())

@app.route('/predict_milk_food', methods=['POST'])
def predict_milk_food():
    '''
    POST JSON data with 'data': []
    like [1,2,3,3,3]

    Returns: JSON array with shape n_size [1,2,3,.....]
    '''
    data = request.get_json(force=True)
    val = np.array(data['data'])
    food = int(data['food'])
    fd = food/default_food
    size = len(val)
    pl = n_size - size
    if val.shape != (n_size,):
        val = np.pad(val, (0, pl), 'constant')
    d = val.reshape(1, n_size)
    predictions = model.predict([d])[0].reshape(n_size)
    predictions = predictions * fd
    predictions[:size] = val[:size]
    return jsonify(predictions.tolist())

@app.route('/predict_milk_breeder', methods=['POST'])
def predict_milk_breeder():
    '''
    POST JSON data with 'data': []
    like [1,2,3,3,3]

    Returns: JSON array with shape n_size [1,2,3,.....]
    '''
    data = request.get_json(force=True)
    val = np.array(data['data'])
    size = len(val)
    pl = n_size - size
    if val.shape != (n_size,):
        val = np.pad(val, (0, pl), 'constant')
    d = val.reshape(1, n_size)
    predictions = model.predict([d])[0].reshape(n_size)
    predictions = predictions * np.random.uniform(0.8, 1.2)
    predictions[:size] = val[:size]
    return jsonify(predictions.tolist())

@app.route('/optimize', methods=['POST'])
def optimize():
    '''
    POST JSON data with 'data': [[],[],[]]

    Returns: JSON array of lag values
    '''
    data = request.get_json(force=True)
    val = data['data']
    print(np.array(val))
    global ts, init_guess, bnd
    ts = np.array(val)
    init_guess = [-30]*len(ts)
    bnd = [(-305, 305) for i in range(len(ts))]
    result = minimize(objective, init_guess, method='Powell', bounds=bnd)
    optimal_lags = np.round(result.x)
    return jsonify(optimal_lags.tolist())

if __name__ == '__main__':
    app.run("0.0.0.0", port=port, debug=debug)