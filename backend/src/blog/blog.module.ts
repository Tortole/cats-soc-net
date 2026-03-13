import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { BlogSchema } from "./schemas/blog.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: "Post", schema: BlogSchema }])],
    providers: [BlogService],
    controllers: [BlogController],
})
export class BlogModule {}
