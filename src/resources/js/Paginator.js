
class Paginator{

    constructor(){
        this.paginator = document.getElementsByClassName("products-paginator")[0];
    }

    render(){
        this.paginator.innerHTML = '';
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
    }

}

