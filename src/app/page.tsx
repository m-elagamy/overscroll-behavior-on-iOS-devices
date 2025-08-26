"use client";

import { ScrollableContainer } from "../components/ScrollableContainer";
import "../styles/ios-scroll-chaining.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold">iOS Scroll Chaining Demo V3</h1>
        <p className="text-blue-100">Scroll down to test the solution</p>
      </header>

      {/* Main Content Area */}
      <main className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">How to Test</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Scroll down in the content area below</li>
              <li>When you reach the bottom, continue dragging</li>
              <li>
                On iOS Safari, the page should now continue scrolling smoothly
              </li>
              <li>On Android, this should work by default</li>
            </ol>
          </div>

          {/* Scrollable Container with Long Content */}
          <ScrollableContainer
            className="bg-white rounded-lg shadow-md border-2 border-blue-200"
            style={{ height: "400px" }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                Scrollable Content Area
              </h3>

              {/* Generate lots of content to make it scrollable */}
              {Array.from({ length: 100 }, (_, i) => (
                <div
                  key={i}
                  className="p-3 mb-2 bg-gray-50 rounded border-l-4 border-blue-300"
                >
                  <strong>Item {i + 1}</strong> - This is a test item to
                  demonstrate scroll chaining.
                  {i % 5 === 0 && (
                    <span className="text-blue-600 ml-2">✨ Special item!</span>
                  )}
                </div>
              ))}

              <div className="p-4 bg-green-100 border border-green-300 rounded text-center">
                <strong>🎯 Bottom reached!</strong> Try continuing to scroll -
                the page should now scroll!
              </div>
            </div>
          </ScrollableContainer>

          {/* Additional content below to test page scrolling */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Page Content Below</h3>
            <p className="text-gray-700 mb-4">
              This content is below the scrollable container. When you scroll to
              the bottom of the container above and continue dragging, you
              should smoothly scroll to this content on iOS Safari.
            </p>

            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-2 mb-1 bg-gray-50 rounded">
                Additional page content {i + 1}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <p>iOS Scroll Chaining Solution Demo</p>
          <p className="text-sm text-gray-400 mt-1">
            Test this on iOS Safari to see the difference!
          </p>
        </div>
      </footer>
    </div>
  );
}
