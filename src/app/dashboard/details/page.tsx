'use client';
import { DetailsManagmentTable } from '@/widgets/detail-managment-table/details-managment-table';
import { CreateDetailDialog } from '@/features/details-managment/_ui/create-detail-dialog';
import { useState } from 'react';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { useDeleteDetails } from '@/features/details-managment/_vm/use-delete-details';
import { toast } from '@/shared/ui/use-toast';

const DashboardDetailsPage = () => {
  const [rowSelection, setRowSelection] = useState({});
  const { deleteDetails } = useDeleteDetails();
  return (
    <main className={'flex flex-col w-full h-full gap-2'}>
      <DetailsManagmentTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        className={'flex-grow min-h-0'}
      />
      <div className="flex gap-2 justify-center md:justify-end">
        {Object.entries(rowSelection).length > 0 && (
          <AppButton
            onClick={async () => {
              const res = await deleteDetails(Object.keys(rowSelection).map(Number));
              if (res) {
                toast({
                  title: 'Успешно',
                  description: 'Товары удалены',
                });
              }
            }}
            theme={'destructive'}>
            Удалить выбранные товары
          </AppButton>
        )}
        <CreateDetailDialog triggerClassName={''} />
      </div>
    </main>
  );
};
export default DashboardDetailsPage;
