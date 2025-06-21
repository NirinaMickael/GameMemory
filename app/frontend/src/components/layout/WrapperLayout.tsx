import type { PropsWithChildren } from 'react';

export function WrapperLayout({ children }: PropsWithChildren) {
  return (
    <div className=" p-3 min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {children}
    </div>
  );
}
