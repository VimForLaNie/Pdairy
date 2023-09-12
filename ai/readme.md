## AI of Pdiaty API Documentation

### Overview

This API provides a set of endpoints related to milk predictions and optimization. 

### Build
With dockerfile
#### Env docker
- PORT (3000)
- DEBUG (0)

### Endpoints

#### 1. Predict Milk

- **Endpoint**: `/predict_milk`
- **Method**: `POST`
- **Description**: Predicts the milk quantity based on provided milk.
  
**Request Body**:
```json
{
    "data": [...] // array of milk data ex.[1,3,3]
}
```

**Response**:
```json
[...] array with 305 element
```

---

#### 2. Predict Milk Food

- **Endpoint**: `/predict_milk_food`
- **Method**: `POST`
- **Description**: Predicts the milk quantity based on the food input provided.
  
**Request Body**:
```json
{
    "food": int,
    "data": [...] // array of milk data ex.[1,3,3]
}
```

**Response**:
```json
[...] array with 305 element
```

---

#### 3. Predict Milk Breeder

- **Endpoint**: `/predict_milk_breeder`
- **Method**: `POST`
- **Description**: Predicts the milk quantity based on the breeder's.
  
**Request Body**:
```json
{
    "data": [...] // array of milk data ex.[1,3,3]
}
```

**Response**:
```json
[...] array with 305 element
```

---

#### 4. Optimize

- **Endpoint**: `/optimize`
- **Method**: `POST`
- **Description**: Provides optimization shift time of each data for minimize var of sum.
  
**Request Body**:
```json
{
    "data": [
        [...], [...], [...], ...n // array need to be 305 shape
        ]
}
```

**Response**:
```json
[...] array with n element
```

---
