export class Car {
    public id:number;
    public make:string;
    public model:string;
    constructor(
        fields?:{
            id?:number,
            model?:string,
            make?:string
        }){
            if(fields)Object.assign(this,fields);
        }

        /*
        constructor(  //before, that was enough 
        public id:number,
        public make:string,
        public model:string
        
    ){}
    */
}