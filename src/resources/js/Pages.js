import products from "../data/products.js";
import Product from "./Product.js";

class Pages{

    constructor(){
        this.productsGrilla = document.getElementsByClassName("products-grilla")[0];
        this.allProducts = products;
        this.productsById = {};
        this.filteredProducts = this.allProducts;
        this.currentPage = 0;
        this.pages = [];
        this.toObject();
        this.makePages();
        this.render();
    }

    toObject(){
        this.allProducts.map(product=>{
            this.productsById[product.id] = product;
        });
    }

    makePages(){
        let pages = [[]];
        this.filteredProducts.forEach((item)=>{
            if(pages[pages.length-1].length==12){
                pages.push([item]);
            }else{
                pages[pages.length-1].push(item);
            }
        });
        this.pages = pages;
    }

    render(){
        this.productsGrilla.innerHTML = '';
        let _products = [];
        this.pages[this.currentPage].forEach((item)=>{
            let _product = new Product(item);
            this.productsGrilla.innerHTML += _product.renderToGrilla();
            _products.push(_product);
        });
        _products.forEach(product=>{
            product.addListener();
        });
    }

}

let a = new Pages();