import productPages from './ProductPages.js';
import navbar from './NavBar.js';

class Filter{

    constructor(){
        this.filterFrom = document.getElementById("filter-input-from");
        this.filterTo = document.getElementById("filter-input-to");
        this.filterInputs = document.getElementsByClassName("filter-inputs");
        this.filterBtn = document.getElementById("filter-btn");

        this.rangeFrom = document.getElementById("input-range-from");
        this.rangeTo = document.getElementById("input-range-to");
        this.slider = document.getElementById("input-slider");

        this.minPrice = productPages.minPrice;
        this.maxPrice = productPages.maxPrice;
        this.getParams();
        this.render();
        this.addListener();
    }

    addListener(){
        this.rangeFrom.addEventListener('input', (e)=>{
            const valFrom = parseFloat(e.target.value);
            const valTo = parseFloat(this.rangeTo.value);
            if(valFrom<this.minPrice){
                e.target.value = this.minPrice;
            }
            if(valFrom>=valTo){
                e.target.value = valTo;
            }
            this.slider.style.marginLeft = `${e.target.value}%`;
            this.filterFrom.value = e.target.value;
        });
        
        this.rangeTo.addEventListener('input', (e)=>{
            const valFrom = parseFloat(this.rangeFrom.value);
            const valTo = parseFloat(e.target.value);
            if(valTo>this.maxPrice){
                e.target.value = this.maxPrice;
            }
            if(valFrom>=valTo){
                e.target.value = valFrom;
            }
            this.slider.style.marginRight = `${100-e.target.value}%`;
            this.filterTo.value = e.target.value;
        });

        Object.values(this.filterInputs).forEach(_filter=>{
            _filter.addEventListener('change', ()=>{
                let valFrom = parseFloat(this.filterFrom.value);
                let valTo = parseFloat(this.filterTo.value);
                let [from, to] = this.verifyFilter(valFrom, valTo);
                this.filterFrom.value = from;
                this.filterTo.value = to;
                let perFrom = (100 * from)/(this.maxPrice);
                let perTo = (100 * to)/(this.maxPrice);
                this.slider.style.marginLeft = `${parseInt(perFrom)}%`;
                this.slider.style.marginRight = `${100-parseInt(perTo)}%`;
                this.rangeFrom.value = perFrom;
                this.rangeTo.value = perTo;
            });
        });

        this.filterBtn.addEventListener('click', ()=>{
            const search = navbar.searchInput.value;
            const priceFrom = this.filterFrom.value;
            const priceTo = this.filterTo.value;
            window.location.href = `home.html?search=${search}&priceFrom=${priceFrom}&priceTo=${priceTo}`;
        });
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

    getParams(){
        const urlSearchParams = new URLSearchParams(window.location.search);
        const {priceFrom, priceTo} = Object.fromEntries(urlSearchParams.entries());
        const _priceFrom = (priceFrom && parseFloat(priceFrom)!=NaN) ? parseFloat(priceFrom) : this.minPrice;
        const _priceTo = (priceTo && parseFloat(priceTo)!=NaN) ? parseFloat(priceTo) : this.maxPrice;
        let [from, to] = this.verifyFilter(_priceFrom, _priceTo);
        this.filterFrom.value = from;
        this.filterTo.value = to;
    }
    
    render(){
        let perFrom = this.filterFrom.value
        let perTo = this.filterTo.value
        this.slider.style.marginLeft = `${perFrom}%`;
        this.slider.style.marginRight = `${100-parseFloat(perTo)}%`;
        this.rangeFrom.value = perFrom;
        this.rangeTo.value = perTo;
    }

}

const filter = new Filter();
export default filter;