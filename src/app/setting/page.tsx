import React from 'react';
import { WarningTriangleSolid} from 'iconoir-react';

const SettingsPage: React.FC = () => {

  return (
    <div className="mx-4 flex justify-center items-center min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">アカウント</h1>
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-gray-600">
                Your email address is <strong>john.doe@company.com</strong>
                </p>
            </div>
            <hr className="mt-4 mb-8" />
            <div className="mb-10">
                <p className="py-2 text-xl font-semibold">ログアウト</p>
                <p className="mt-2">
                サービスからログアウトします。再度ログインするには、ログイン画面に戻る必要があります。
                </p>
                <button
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                ログアウト
                </button>
            </div>
            <hr className="mt-4 mb-8"/>
            <div id="alert-additional-content-2" className="p-4 mb-8 text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                <div className="flex items-center">
                    <WarningTriangleSolid width={25} height={25} strokeWidth={1} />
                    <h3 className="text-lg font-medium ml-2">アカウントを削除する</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    サービスからアカウントを削除します。この操作は取り消すことができません。
                </div>
                <div className="flex">
                    <button type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                    アカウントを削除する
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;