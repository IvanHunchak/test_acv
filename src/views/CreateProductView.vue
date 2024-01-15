<template>
  <div class="create">
    <h1>This is an about page</h1>

    <div class="product-form">
      <h2>Add a New Product</h2>
      <div>
        <div class="form-group">
          <label for="image">Product Image:</label>
          <input type="file" id="image" name="image" accept="image/*">
        </div>

        <div class="form-group">
          <label for="title">Product Title:</label>
          <input type="text" id="title" name="title" required>
        </div>

        <div class="form-group">
          <label for="description">Product Description:</label>
          <textarea id="description" name="description" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="price">Product Price:</label>
          <input type="number" id="price" name="price" step="0.01" required>
        </div>
        <button type="submit">Add Product</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
