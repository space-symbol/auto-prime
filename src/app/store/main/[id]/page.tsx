import { getDetailByIdAction } from '@/entities/detail/_actions/get-detail-by-id';
import { DetailCost } from '@/entities/detail/client';
import { getUserCartItemAction } from '@/entities/user/server';
import { getAppSessionServer } from '@/entities/user/server';

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

export default async function Detail({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getAppSessionServer();
  const detail = await getDetailByIdAction(Number(id));

  if (!id || Number.isNaN(Number(id)) || !detail) {
    return <h2 className="h-full w-full flex justify-center items-center">Упс! Товар не найден.</h2>;
  }

  const cartItem = await getUserCartItemAction({ detailId: detail.id, userId: session?.user.id });

  return (
    <main className="flex gap-4 pr-2 flex-col min-h-full">
      <h1>{detail.name}</h1>
      <div className="flex flex-col grid-rows-2 grid-flow-row gap-8 md:grid-rows-1 md:grid md:grid-cols-5">
        <img
          className="w-100% h-auto sm:w-auto sm:h-96 object-cover col-span-3 rounded-sm place-self-center"
          src={detail.images[0]}
          alt={detail.name}
        />
        <div className="flex col-span-2 flex-col gap-6 justify-between h-full">
          <section className="flex font-rubik flex-col gap-2 self-start">
            <h2>Описание</h2>
            <p>{detail.description}</p>
          </section>
          <DetailCost
            priceInfo={{
              price: detail.price,
              discountedPrice: detail.discountedPrice,
              quantityAvailable: detail.quantityAvailable,
            }}
            cartItem={cartItem}
            id={detail.id}
          />
        </div>
      </div>
    </main>
  );
}
