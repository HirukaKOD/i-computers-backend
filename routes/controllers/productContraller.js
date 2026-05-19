import express from "express";
import Product from "../../models/product.js";
import { isAdmin } from "./userController.js";
import e from "express";

export async function createProduct(req, res){
    try{
        console.log(req.body);

        if(isAdmin(req)){
            const product = new Product(req.body)
            await product.save()
            res.json({message: "Product created successfully"})
        }else{
            res.status(403).json({message: "You need to login as admin to create a product"})   
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({message: "Error creating product", error: error.message})
    }
}

export async function getAllProducts(req, res) {
  try {
    if (isAdmin(req)) {
      const products = await Product.find();
      return res.json(products);
    }

    const products = await Product.find({ isAvailable: true });
    return res.json(products);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
}
export async function deleteProduct(req, res) {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({
        message: "You need to login as admin to delete a product"
      });
    }

    const productId = req.params.productId;

    const product = await Product.findOne({ productId: productId });

    if (product == null) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await Product.findOneAndDelete({ productId: productId });

    return res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting product",
      error: error.message
    });
  }
}

export async function updateProduct(req, res){
    try{
        const productId = req.params.productId;
        if(isAdmin(req)){
            const product = await Product.findOne({productId: productId})
            if(product == null){
                return res.status(404).json({message: "Product not found"})
            }
            await Product.findOneAndUpdate({productId: productId}, req.body)
            return res.json({message: "Product updated successfully"})
        }else{
            return res.status(403).json({message: "You need to login as admin to update a product"})
        }

    }catch(error){
        console.error(error)
        return res.status(500).json({message: "Error updating product", error: error.message})
    }
}
export async function getProductById(req, res){
    try{
        const productId = req.params.productId;
        const product = await Product.findOne({productId: productId})
        if(product == null){
            return res.status(404).json({message: "Product not found"})
        }
        return res.json(product);
    }catch(error){
        console.error(error)
        return res.status(500).json({message: "Error fetching product", error: error.message})
    }   
}