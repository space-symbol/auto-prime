'use client';
import { AppButton } from '@/shared/ui/app-button/app-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { DataTable } from '@shared/ui/data-table';
import { ColumnDef, OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import DotsHorizontalIcon from '@shared/public/assets/icons/dots-horizontal.svg';
import { getDetailsByParams } from '@/entities/detail/client';
import { DetailEntity } from '@/entities/detail/_domain/types';
import { UpdateDetailModal, useDeleteDetails } from '@/features/details-managment/client';
import { toast } from '@/shared/ui/use-toast';
import { useQuery } from '@tanstack/react-query';

interface DetailsManagmentTableProps {
  className?: string;
  rowSelection: {};
  setRowSelection?: OnChangeFn<RowSelectionState>;
}
export const DetailsManagmentTable = (props: DetailsManagmentTableProps) => {
  const { className, rowSelection, setRowSelection } = props;

  const { data: details, isPending } = useQuery({
    ...getDetailsByParams({ limit: 20 }),
  });

  const { deleteDetails } = useDeleteDetails({
    onSuccess: (data) => {
      toast({
        title: 'Товар(ы) успешно удален',
        description: data.count > 1 ? `${data.count} товар(а) были удалены` : `${data.count} товар был удален`,
        variant: 'success',
      });
    },
    onError: (error) => {
      toast({
        title: 'Произошла ошибка',
        description: error.message,
        variant: 'warning',
      });
    },
  });

  const colums: ColumnDef<DetailEntity>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type={'checkbox'}
          checked={table.getIsAllPageRowsSelected()}
          onChange={(event) => {
            table.toggleAllPageRowsSelected(!!event.target.checked);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <input
          type={'checkbox'}
          checked={row.getIsSelected()}
          onChange={(event) => {
            row.toggleSelected(!!event.target.checked);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: '№',
      cell: (row) => `${Number(row.row.index) + 1}`,
      sortingFn: (a, b) => a.index - b.index,
    },
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      accessorKey: 'description',
      header: 'Описание',
    },
    {
      accessorKey: 'price',
      header: 'Цена (₽)',
    },
    {
      accessorKey: 'quantityOrdered',
      header: 'Количество заказов',
    },
    {
      accessorKey: 'discountPercentage',
      header: 'Скидка (%)',
    },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AppButton
                className="font-sm"
                LeftIcon={<DotsHorizontalIcon className="h-4 w-4 fill-current" />}
                variant="transparent"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-full text-sm p-0'}>
              <DropdownMenuGroup className="p-2">
                <UpdateDetailModal detail={row.original} />
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <AppButton
                    onClick={() => deleteDetails([row.original.id])}
                    fullWidth
                    className={'justify-start rounded-none'}
                    variant="destructive">
                    Удалить
                  </AppButton>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable<DetailEntity, typeof colums>
      columns={colums}
      data={details || []}
      isLoading={isPending}
      className={className}
      searchPlaceholder={'Название товара'}
      filterByColumn={'name'}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      getRowId={(row) => row.id.toString()}
    />
  );
};
