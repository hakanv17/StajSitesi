import {Router} from "express";
import { sample_parts, sample_tags } from "../data";
import asynceHandler from "express-async-handler";
import { PartModel } from "../models/part.model";

const router = Router();

router.get("/",asynceHandler(
    async (req, res) =>{
        const parts = await PartModel.find();
        res.send(parts);
    }
))

router.get("/seed", asynceHandler(
  async (req, res) =>{
    const partsCount = await PartModel.countDocuments();
    if(partsCount>0){
        res.send("Seed is already done!");
        return;
    } 
    await PartModel.create(sample_parts);
    res.send("Seed Is Done");
  }
))

router.get("/search/:searchTerm",asynceHandler(
    async (req,res) => {
        const searchRegex = new RegExp(req.params.searchTerm, "i");
        const parts = await PartModel.find({name: {$regex:searchRegex}})
        res.send(parts);
    }
))

router.get("/tags", asynceHandler(
    async (req,res) => {
        const tags = await PartModel.aggregate([
            {
                $unwind:"$tags"
            },
            {
                $group:{
                    _id: "$tags",
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id:0,
                    name: "$_id",
                    count:"$count"
                }
            }
        ]).sort({count: -1});
        const all = {
            name:"All",
            count: await PartModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

router.get("/tag/:tagName", asynceHandler(
    async (req, res) =>{
        const parts = await PartModel.find({tags:req.params.tagName})
        res.send(parts);
    }
))

router.get("/:partId", asynceHandler(
    async (req,res) =>{
        const part = await PartModel.findById(req.params.partId);
        res.send(part);
    }
))

export default router;