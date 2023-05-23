

const ProductValidation = (product) => {

    let errors = {}
  
    if (!product.name) {
        errors.name = "Product Name Required"
    } else {
        errors.name = ""
    }
    if (!product.category) {
        errors.category = "Category Required"
    } else if (product.category != "Boots" && product.category != "Trainers" && product.category != "Sandals") {
        errors.category = "Category must be Boots,Traners or Sandals "
        
    }
    if (!product.brand) {
        errors.brand = "Brand Required"
    }
    if (!product.sex) {
        errors.sex = "Sex Required"
    } else if (product.sex != "F" && product.sex != "M" ) {
        errors.sex = "Sex must be F or M"

    }
    if (!product.price) {
        errors.price = "Price Required"
    }
    if (!product.pictureUrl) {
        errors.pictureUrl = "PictureUrl Required"
    } 

    return errors;

}

export default ProductValidation;