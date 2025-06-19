// Simulación de base de datos en memoria
let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electrónicos', stock: 10 },
  { id: 2, name: 'Smartphone', price: 599.99, category: 'Electrónicos', stock: 25 },
  { id: 3, name: 'Libro de JavaScript', price: 29.99, category: 'Libros', stock: 50 }
];

let nextProductId = 4;

const getAllProducts = (req, res) => {
  try {
    const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;
    let filteredProducts = products;

    // Filtros
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      );
    }

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredProducts.length / limit),
        totalProducts: filteredProducts.length,
        hasNext: endIndex < filteredProducts.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      error: error.message
    });
  }
};

const createProduct = (req, res) => {
  try {
    const { name, price, category, stock = 0 } = req.body;

    const newProduct = {
      id: nextProductId++,
      name,
      price: parseFloat(price),
      category,
      stock: parseInt(stock)
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, stock } = req.body;

    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Actualizar solo los campos proporcionados
    if (name !== undefined) products[productIndex].name = name;
    if (price !== undefined) products[productIndex].price = parseFloat(price);
    if (category !== undefined) products[productIndex].category = category;
    if (stock !== undefined) products[productIndex].stock = parseInt(stock);

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};