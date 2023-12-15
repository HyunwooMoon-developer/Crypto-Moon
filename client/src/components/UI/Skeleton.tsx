const getSkeletons = (qty: number) => {
  let html = '';

  for (let i = 0; i < qty; i++) {
    html += `
          <div className="flex items-center justify-between pt-4">
              <div>
                  <div className="bg-gray-300 rounded-full dark:bg-gray-600 w-24 h-2.5 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="bg-gray-300 rounded-full dark:bg-gray-700 w-12 h-2.5" />
          </div>
      `;
  }
  return html;
};

const Skeleton = () => {
  return (
    <div
      role="status"
      className="p-4 bg-white dark:bg-gray-900 space-y-4 border rounded-lg mt-8 w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="bg-gray-300 rounded-full dark:bg-gray-600 w-24 h-2.5 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="bg-gray-300 rounded-full dark:bg-gray-700 w-12 h-2.5" />
      </div>
      {getSkeletons(4)}
      <span className="sr-only">Loading Data...</span>
    </div>
  );
};

export default Skeleton;
