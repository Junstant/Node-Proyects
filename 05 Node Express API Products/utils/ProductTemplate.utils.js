/**
 * Clase que representa un producto.
 */
class ProductGenerator {
    /**
     * Crea una nueva instancia de Product.
     * @param {string} name - El nombre del producto. Debe ser una cadena no vacía.
     * @param {number} price - El precio del producto. Debe ser un número positivo.
     * @param {string} description - La descripción del producto. Debe ser una cadena no vacía.
     * @param {number} stock - La cantidad de stock del producto. Debe ser un número positivo.
     * @throws {Error} Si alguno de los parámetros no cumple con los requisitos.
     */
    constructor(name, price, description, stock) {

        // Manejo de errores
        if (typeof price !== 'number' || price < 0) {
            throw new Error('Price must be a positive number');
        }
        if (typeof stock !== 'number' || stock < 0) {
            throw new Error('Stock must be a positive number');
        }
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        if (typeof description !== 'string' || description.length === 0) {
            throw new Error('Description must be a non-empty string');
        }

        this.name = name;
        this.price = price;
        this.description = description;
        this.stock = stock;
        this.image = 'https://via.placeholder.com/150';
    }

    /**
     * Devuelve el precio del producto formateado como una cadena con el símbolo de dólar y dos decimales.
     * @returns {string} El precio formateado.
     */
    getFormattedPrice() {
        return `$${this.price.toFixed(2)}`;
    }

    /**
     * Cambia el nombre del producto.
     * @param {string} newName - El nuevo nombre del producto.
     */
    setName(newName) {
        this.name = newName;
    }

    /**
     * Cambia el precio del producto.
     * @param {number} newPrice - El nuevo precio del producto.
     */
    setPrice(newPrice) {
        this.price = newPrice;
    }

    /**
     * Cambia la descripción del producto.
     * @param {string} newDescription - La nueva descripción del producto.
     */
    setDescription(newDescription) {
        this.description = newDescription;
    }

    /**
     * Cambia la cantidad de stock del producto.
     * @param {number} newStock - La nueva cantidad de stock del producto.
     */
    setStock(newStock) {
        this.stock = newStock;
    }

    /**
     * Cambia la imagen del producto.
     * @param {string} newImage - La nueva URL de la imagen del producto.
     */
    setImage(newImage) {
        this.image = newImage;
    }
}

export default ProductGenerator;