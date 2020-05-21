import { Application, Router } from "https://deno.land/x/oak/mod.ts";

//File : model

interface Course {
    name: String,
    price: number,
    certification: boolean
}

//File :Data
let courses: Array<Course> =
    [
        {
            name: "C++",
            price: 2000,
            certification: false

        },
        {
            name: "Dart",
            price: 90000,
            certification: true
        },
        {
            name: "Java",
            price: 5000,
            certification: false
        },
    ];



//File : Controllers
export const getCourse = ({ response }: { response: any }) => {
    response.body = courses;
}
export const addCourse = async ({ request, response }: { request: any; response: any; },
) => {
    const body = await request.body();
    console.log(body);
    
    const course: Course = body.value;
    console.log(course);
    
    courses.push(course);
    response.body = { courseAdded: "SUCCESS" };
    response.status = 200;
}

//File :Server file
const app = new Application();
const router = new Router();
const port = 3000;
router.get("/learn", getCourse).post("/create", addCourse);
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 4300 });