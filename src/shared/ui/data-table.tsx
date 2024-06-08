'use client';
import classNames from 'classnames';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  TableState,
  Updater,
  OnChangeFn,
  RowSelectionState,
  Row,
} from '@tanstack/react-table';
import { AppButton } from './app-button/app-button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Spinner } from './spinner/spinner';
import { AppInput } from './app-input/app-input';
import { useState } from 'react';

interface DataTableProps<TData, TValue> extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  filterByColumn?: keyof TData;
  onSelectedChange?: (updater: Updater<TableState>) => void;
  rowSelection?: {};
  setRowSelection?: OnChangeFn<RowSelectionState>;
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData> | undefined) => string;
}

export const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
  const {
    className,
    columns,
    data,
    isLoading,
    searchPlaceholder,
    filterByColumn,
    rowSelection,
    setRowSelection,
    getRowId,
  } = props;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getRowId,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className={classNames('h-full flex flex-col gap-2', className)}>
      {filterByColumn && (
        <AppInput
          value={(table.getColumn('name' as string)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name' as string)?.setFilterValue(event.target.value)}
          label={searchPlaceholder}
          className={'w-72'}
        />
      )}
      <div className={'flex overflow-auto gutter-stable h-full'}>
        <Table>
          <TableHeader className={'top-0 sticky z-10'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const headerName = header.column.columnDef.header;
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <AppButton
                          variant="transparent"
                          onClick={() =>
                            header.column.toggleSorting(
                              header.column.getIsSorted() ? header.column.getIsSorted() === 'asc' : true,
                            )
                          }
                          className="p-0 justify-center h-fit"
                          active={!!header.column.getIsSorted()}>
                          {headerName?.toString()}
                        </AppButton>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className={'flex justify-center'}>
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  Пусто
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={'flex justify-center items-center space-x-2 relative flex-shrink pt-5'}>
        <div className={'select-none text-sm text-dark-gray flex absolute left-0 top-0'}>
          {table.getFilteredSelectedRowModel().rows.length} из {table.getFilteredRowModel().rows.length} строк выбрано.
        </div>
        <div className={'flex gap-2'}>
          <AppButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Назад
          </AppButton>
          <AppButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Далее
          </AppButton>
        </div>

        <span className={'select-none absolute text-sm right-4 text-purple top-0 flex-shrink-0'}>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
      </div>
    </div>
  );
};
