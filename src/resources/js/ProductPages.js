import products from "../data/products.js";
import Product from "./Product.js";
import Paginator from "./Paginator.js";
class ProductPages{

    constructor(){
        this.allProducts = products;
        this.grillaContainer = document.getElementsByClassName("right")[0];
        this.productsGrilla = document.getElementsByClassName("products-grilla")[0];
        this.Paginator = new Paginator(this);

        this.filteredProducts = this.allProducts;
        this.currentPage = 0;
        this.pages = [];

        this.search;
        this.priceFrom;
        this.priceTo;

        let [min, max] = this.getLowHighPrice();
        this.minPrice = min;
        this.maxPrice = max;

        this.getParams();
        this.searchEngine(this.search, this.priceFrom, this.priceTo);
    }

    getParams(){
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        this.search = params.search || '';
        this.priceFrom = (params.priceFrom && parseFloat(params.priceFrom)!=NaN) ? parseFloat(params.priceFrom) : this.minPrice;
        this.priceTo = (params.priceTo && parseFloat(params.priceTo)!=NaN) ? parseFloat(params.priceTo) : this.maxPrice;
        let [from, to] = this.verifyFilter(this.priceFrom, this.priceTo);
        this.priceFrom = from;
        this.priceTo = to;
    }

    verifyFilter(from, to){
        if(from < this.minPrice){
            from = this.minPrice;
        }else if(from > this.maxPrice){
            from = this.maxPrice;
        }
        if(to < this.minPrice){
            to = this.minPrice;
        }else if(to > this.maxPrice){
            to = this.maxPrice;
        }
        if(from > to){
            from = to;
        }
        return [from, to];
    }

    getLowHighPrice(){
        let min = 1000;
        let max = 0;
        this.allProducts.forEach(product=>{
            if(product.price<min){
                min = product.price;
            }
            if(product.price>max){
                max = product.price;
            }
        });
        return [min, max];
    }

    previusPage(){
        if(this.currentPage==0) return;
        this.currentPage = this.currentPage - 1;
        this.render();
        this.Paginator.render();
    }

    nextPage(){
        if(this.currentPage==this.pages.length-1) return;
        this.currentPage = this.currentPage + 1;
        this.render();
        this.Paginator.render();
    }

    changePage(newPage){
        if(newPage<0 || newPage>=this.pages.length) return;
        this.currentPage = newPage;
        this.render();
        this.Paginator.render();
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

    searchEngine(inputText, filterFrom, filterTo){
        console.time("search_engine");
        this.filteredProducts = [];
        const similitud = (text1 = 'abc', text2 = 'abc')=>{
            text1 = text1.toLowerCase();
            text2 = text2.toLowerCase();
            let i = 0, j = 0;
            for(i,j;i<text1.length&&j<text2.length;i++){
                if(text1[i]==text2[j]) j++;
            }
            return (j<text2.length) ? false : true;
        }
        const textWords = inputText.split(' ');
        products.forEach(product=>{
            if(product.price>=filterFrom && product.price<=filterTo){
                let productName = product.title;
                let words = productName.split(' ');
                let i = 0, j = 0;
                for(i,j;i<words.length&&j<textWords.length;i++){
                    if(similitud(words[i], textWords[j])) j++;
                }
                if(j>=textWords.length){
                    this.filteredProducts.push(product);
                }
            }
        });
        this.currentPage = 0;
        this.makePages();
        this.render();
        this.Paginator.render();
        console.log(this.filteredProducts.length);
        console.timeEnd("search_engine");
    }

    render(){
        this.productsGrilla.innerHTML = '';
        this.grillaContainer.scrollTop = 0;
        let _products = [];
        this.pages[this.currentPage].forEach((item, i)=>{
            let _product = new Product(item, i);
            this.productsGrilla.innerHTML += _product.render();
            _products.push(_product);
        });
        _products.forEach(product=>{
            product.addListener();
        });
    }

}

const productPages = new ProductPages();
export default productPages;