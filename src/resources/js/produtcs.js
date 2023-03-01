import products from "../data/products.js";

class Products{

    constructor(){
        this.container = document.getElementsByClassName("products-grilla")[0];
        this.paginator = document.getElementsByClassName("products-paginator")[0];
        this.allProducts = products;
        this.filteredProducts = this.allProducts;
        this.currentPage = 0;
        this.pages = [];
        this.makePages();
        this.render();
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

    makeProduct(product){
        return(
            '<div class="product">'+
            '    <div class="product-offert">'+
            '    </div>'+
            '    <div class="product-image">'+
            `        <img src="./resources/images/products/${product.id}.jpg" alt="">`+
            '    </div>'+
            '    <div class="product-name">'+
            `        <span><strong>${product.title}</strong></span>`+
            '    </div>'+
            '    <div class="product-description">'+
            '        <div class="product-desc-cant">'+
            `            <span>${product.amount}</span>`+
            '        </div>'+
            '        <div class="product-desc">'+
            `            <span>Natura</span>`+
            '        </div>'+
            '    </div>'+
            '    <div class="product-price">'+
            `        <strong><span>${product.price} €</span></strong>`+
            '    </div>'+
            '</div>'
        )
    }

    makePaginator(text){
        return(
            '<div class="products-page">'+
                `<button data-page="${text}" class="products-page-number">`+
                    `${text}`+
                '</button>'+
            '</div>'
        )
    }

    changePage(newPage){
        console.log(this.currentPage);
        console.log(newPage);
        if(newPage<0 || newPage>=this.pages.length) return;
        this.currentPage = newPage;
        this.render();
    }

    render(){
        this.container.innerHTML = '';
        this.paginator.innerHTML = '';
        this.pages[this.currentPage].forEach((item)=>{
            this.container.innerHTML += this.makeProduct(item);
        });
        if(this.pages.length<=5){
            for(let i=0;i<this.pages.length;i++){
                this.paginator.innerHTML = this.makePaginator(i+1) + this.paginator.innerHTML;
            }
        }else{
            let i = 0;
            if(this.currentPage>0){
                this.paginator.innerHTML = this.makePaginator('<');
                i++;
            }
            let j = i;
            for(i;i<j+5;i++){
                this.paginator.innerHTML = this.makePaginator(i+1) + this.paginator.innerHTML;
            }
            if(i<this.pages.length){
                this.paginator.innerHTML = this.makePaginator('>') + this.paginator.innerHTML;
            }
        }
        
        for(let k=0;k<this.paginator.childNodes.length-1;k++){
            let a = this;
            this.paginator.childNodes[k].childNodes[0].addEventListener('click', function(e){
                a.changePage(parseInt(e.target.dataset.page)-1);
            });
        }
    }

}



let a = new Products();

