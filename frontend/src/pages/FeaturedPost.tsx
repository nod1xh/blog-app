import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../config/config";

type PostParams = {
  postId: string;
};

interface Post {
  id: number;
  title: string;
  image: {
    src: string;
  };
  content: string;
  author: string;
  date: string;
}

export default function Post() {
  const { postId } = useParams<PostParams>();
  const idPost = +postId!;
  const [selectedPost, setSelectedPost] = useState<Post>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseUrl}/${idPost}`);
        setSelectedPost(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (!selectedPost) {
    return (
      <div className="flex justify-center">
        <h1 className="text-center font-semibold text-2xl mt-5 text-red-700">
          Page not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex flex-col items-center w-2/4">
        <h1 className="text-3xl text-center">{selectedPost?.title}</h1>
        <p className="mb-5 mt-3 font-semibold underline text-left">
          by: {selectedPost?.author} on {selectedPost?.date}
        </p>
        <div>
          <p className=" mt-5 leading-8">
            <span className="text-3xl">L</span>orem ipsum dolor sit, amet
            consectetur adipisicing elit. Architecto aspernatur minus assumenda
            nulla accusamus? Modi accusamus illum nemo, quos consequatur fugiat
            excepturi unde necessitatibus explicabo soluta ipsa sit blanditiis
            aliquam repellat maiores est accusantium incidunt quidem. Vitae non
            sit ipsam expedita voluptates, itaque voluptatibus nulla obcaecati,
            sed repudiandae laboriosam harum! Vitae reiciendis quidem porro
            totam aliquid recusandae assumenda consequuntur quia incidunt,
            voluptate nobis? Modi nam omnis officia dolorem deleniti accusantium
            quasi excepturi rem quisquam atque harum, a, impedit maxime porro
            alias quaerat aliquam, natus in id expedita reprehenderit. Eius
            aspernatur quod saepe cumque enim quasi velit ipsam assumenda rem
            necessitatibus quia facilis maxime eos optio quo quae unde adipisci,
            dolores nobis asperiores? Recusandae, impedit aut! Labore ipsa
            deserunt ex quos voluptatum, earum, aspernatur totam quidem
            doloribus quasi iure a sunt pariatur nobis eius! Neque tenetur odit
            et quaerat dolores illum aut, cumque quisquam voluptatem, earum
            dolor incidunt obcaecati. Nobis a expedita dolorem maxime tempora
            tenetur ipsa facilis magni pariatur asperiores odit nulla fugiat
            voluptatum totam debitis molestias aliquam possimus culpa, similique
            consequuntur temporibus ut earum suscipit? Debitis deleniti
            dignissimos laudantium, ex ipsa ad quis amet cum laborum omnis
            sapiente dolorem molestiae. Necessitatibus voluptatum nobis harum.
            Atque vero nihil vitae quos.
          </p>
        </div>
      </div>
    </div>
  );
}
