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
import { useGetDetailsQuery } from '@/entities/detail/detail';
import { DetailEntity } from '@/entities/detail/_domain/types';
import { useDeleteDetails } from '@/features/details-managment/client';
import { toast } from '@/shared/ui/use-toast';
interface DetailsManagmentTableProps {
  className?: string;
  rowSelection: {};
  setRowSelection?: OnChangeFn<RowSelectionState>;
}
export const DetailsManagmentTable = (props: DetailsManagmentTableProps) => {
  const { className, rowSelection, setRowSelection } = props;
  const { details, isPending } = useGetDetailsQuery();
  const { deleteDetails } = useDeleteDetails();

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
                className="font-sm h-4 w-4 !p-0"
                LeftIcon={DotsHorizontalIcon}
                theme={'transparent'}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-full text-sm p-0'}>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <AppButton
                    fullWidth
                    className={'justify-start'}
                    theme={'transparent'}
                    onClick={() => {}}>
                    Изменить
                  </AppButton>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <AppButton
                    onClick={async () => {
                      const res = await deleteDetails([row.original.id]);
                      if (res) {
                        toast({
                          title: 'Успешно',
                          description: 'Товар удален',
                          variant: 'success',
                        });
                      }
                    }}
                    fullWidth
                    className={'justify-start rounded-none'}
                    theme={'destructive'}>
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
