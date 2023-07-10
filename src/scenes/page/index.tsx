import { useParams } from "react-router";

const Page = () => {
    const { page } = useParams();
    return (
        <>
        {page}
        </>
    )
}

export default Page;