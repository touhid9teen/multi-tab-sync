import * as Tabs from '@radix-ui/react-tabs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-3xl font-bold text-center">
          Multi-Tab Sync
        </h1>

        <Tabs.Root className="w-full" defaultValue="tab1">
          <Tabs.List className="flex border-b border-gray-200">
            <Tabs.Trigger
              value="tab1"
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
            >
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
            >
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab3"
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
            >
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content
            value="tab1"
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-gray-700">
              This is the content for Tab 1. Radix UI tabs are fully accessible
              and keyboard navigable.
            </p>
          </Tabs.Content>

          <Tabs.Content
            value="tab2"
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-gray-700">
              This is the content for Tab 2. You can use Tailwind CSS classes
              to style the components.
            </p>
          </Tabs.Content>

          <Tabs.Content
            value="tab3"
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-gray-700">
              This is the content for Tab 3. The components are built with
              accessibility in mind.
            </p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  );
}
