class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    

    //u imenu tražimo ključnu riječ 
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                //malo i -> case insensitive
                $options: 'i'
            }

        } : {}

        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){

        const queryCopy = { ...this.queryStr };


        //Micanje polja iz query-ja

        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        //filter za cijenu,ocjenu
        let queryStr = JSON.stringify(queryCopy)
        //veće, manje, veće jednako, manje jednako
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }


    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage*(currentPage-1);

        this.query=this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
module.exports = APIFeatures