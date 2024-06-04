'use client';
import { useParams } from 'next/navigation';
import { useGetDetailQuery } from '@/entities/detail/_queries';
import { DetailAbout } from '@/entities/detail/_ui/detail-about';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { AppLink } from '@/shared/ui/app-link/app-link';
import { useRouter } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.id

//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }

const Detail = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { detail, isPending } = useGetDetailQuery(Number(id));

  if (!id || Number.isNaN(Number(id))) {
    return <div className="h-full w-full flex justify-center items-center">Упс! Товар не найден.</div>;
  }

  if (isPending) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!detail) {
    return <div className="h-full w-full flex justify-center items-center">Упс! Товар не найден.</div>;
  }
  return (
    <main className="flex gap-2 flex-col min-h-full">
      <AppLink
        className="self-end"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}>
        Назад
      </AppLink>
      <DetailAbout detail={detail} />
    </main>
  );
};

export default Detail;
