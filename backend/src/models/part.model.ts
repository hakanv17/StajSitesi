import { Schema, model } from "mongoose";

export interface Part{
    
    name:string;
    price:number;
    tags:string[];
    favorite:boolean;
    imageUrl:string;
    brand:string[];
    deliveryTime:string;
}

export const PartSchema = new Schema<Part>(
    {
        
        name: {type:String,required:true},
        price: {type:Number,required:true},
        tags: {type:[String]},
        favorite: {type:Boolean,default:false},
        imageUrl: {type:String,required:true},
        brand: {type:[String],required:true},
        deliveryTime: {type:String,required:true}
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const PartModel = model<Part>("part", PartSchema);