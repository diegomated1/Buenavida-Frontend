import productPages from './Pages.js';
import navbar from './NavBar.js';

class Filter{

    constructor(){
        this.filterFrom = document.getElementById("filter-input-from");
        this.filterTO = document.getElementById("filter-input-to");
        this.filterBtn = document.getElementById("filter-btn");

        this.lowPrice = productPages.lowPrice;
        this.highPrice = productPages.highPrice;
        this.getParams();
        this.render();
        this.addListener();
    }

    addListener(){
        this.filterBtn.addEventListener('click', ()=>{
            if(parseInt(this.filterFrom.value)<this.lowPrice){
                this.filterFrom.value = this.lowPrice;
            }
            if(parseInt(this.filterTO.value)>this.highPrice){
                this.filterTO.value = this.highPrice;
            }
            const search = navbar.searchInput.value;
            const priceFrom = this.filterFrom.value;
            const priceTo = this.filterTO.value;
            window.location.href = `home.html?search=${search}&priceFrom=${priceFrom}&priceTo=${priceTo}`;
        });
    }
    
    getParams(){
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        var priceFrom = (params.priceFrom && parseFloat(params.priceFrom)!=NaN) ? parseFloat(params.priceFrom) : this.lowPrice;
        var priceTo = (params.priceTo && parseFloat(params.priceTo)!=NaN) ? parseFloat(params.priceTo) : this.highPrice;
        if(priceFrom<this.lowPrice){
            priceFrom = this.lowPrice;
        }
        if(priceTo>this.highPrice){
            priceTo = this.highPrice;
        }
        if(priceFrom>this.priceTo){
            priceFrom = this.priceTo;
        }
        this.filterFrom.value = priceFrom;
        this.filterTO.value = priceTo;
    }
    
    render(){
        this.filterFrom.placeholder = `${this.lowPrice} €`;
        this.filterTO.placeholder = `${this.highPrice} €`;
    }

}

const filter = new Filter();
export default filter;