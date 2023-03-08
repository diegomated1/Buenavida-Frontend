class Paginator{

    constructor(productPages){
        this.paginator = document.getElementsByClassName("products-paginator")[0];
        this.paginatorsBtn = [];
        this.productPages = productPages;
    }

    /**
     * Function to add listeners
     */
    addListener(){
        this.paginatorsBtn.forEach(_paginator=>{
            _paginator.addListener();
        });
    }

    /**
     * Render paginator buttons
     */
    render(){
        this.paginator.innerHTML = '';
        this.paginatorsBtn = [];
        if(this.productPages.pages.length<=5){
            for(let i=0;i<this.productPages.pages.length;i++){
                let _paginator = new PaginatorBtn(this, i, 2, i+1);
                this.paginatorsBtn.push(_paginator);
                this.paginator.innerHTML = _paginator.render() + this.paginator.innerHTML;
            }
        }else{
            let i = 0;
            if(this.productPages.currentPage>0){
                let _paginator = new PaginatorBtn(this, i, 0, '<');
                this.paginatorsBtn.push(_paginator);
                this.paginator.innerHTML = _paginator.render();
                i++;
            }
            let j = i;
            for(i;i<j+5;i++){
                let _paginator = new PaginatorBtn(this, i, 2, i+1);
                this.paginatorsBtn.push(_paginator);
                this.paginator.innerHTML = _paginator.render() + this.paginator.innerHTML;
            }
            if(i<this.productPages.pages.length){
                let _paginator = new PaginatorBtn(this, i, 1, '>');
                this.paginatorsBtn.push(_paginator);
                this.paginator.innerHTML = _paginator.render() + this.paginator.innerHTML;
            }
        }
        this.addListener();
    }
}

class PaginatorBtn{

    constructor(Paginator, id, type, text){
        this.paginator = Paginator;
        this.type = type;
        this.id = id;
        this.text = text;
    }

    /**
     * Function to add listeners
     */
    addListener(){
        // Add listener depending of the type of button
        var paginatorBtn =document.getElementById(`products-paginator-btn-${this.id}`);
        if(this.type==0){
            // If is '<' go to the previus page
            paginatorBtn.addEventListener('click', ()=>{
                this.paginator.productPages.previusPage();
            });
        }else if(this.type==1){
            // If is '>' go to the next page
            paginatorBtn.addEventListener('click', ()=>{
                this.paginator.productPages.nextPage();
            });
        }else{
            // If is number go to the page number
            paginatorBtn.addEventListener('click', ()=>{
                this.paginator.productPages.changePage(parseInt(this.text)-1);
            });
        }
    }

    /**
     * @returns HTML of the button paginator and check if is the current page
     */
    render(){
        const isCurrent = (this.type==2 && this.paginator.productPages.currentPage == parseInt(this.text)-1) ? true : false;
        return(
            '<div class="products-page">'+
                `<button id="products-paginator-btn-${this.id}" class="products-page-number${isCurrent?' products-page-number-current':''}">`+
                    `${this.text}`+
                '</button>'+
            '</div>'
        )
    }
}

export default Paginator;