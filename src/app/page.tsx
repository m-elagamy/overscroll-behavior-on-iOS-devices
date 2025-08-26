"use client";

import { useIOSScrollChaining } from "@/hooks/useIOSScrollChaining";
import { Button, Flex, Form, Input, InputNumber, Select } from "antd";

export default function Home() {
  const ref = useIOSScrollChaining();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Scrollable Div Demo
        </h1>

        <Form layout="vertical" className="mt_24">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <div className="flex gap-10 wide">
            <Form.Item
              label="Scholarship Name"
              name="name"
              className="formItem wide"
              rules={[{ required: true, message: "required" }]}
            >
              <Input size="large" placeholder="Enter scholarship name" />
            </Form.Item>
          </div>

          <div className="flex gap-10 wide">
            <Form.Item
              label="University"
              name="universityId"
              rules={[{ required: true, message: "required" }]}
              className="formItem wide"
            >
              <Select
                filterOption={false}
                size="large"
                placeholder="Select university"
                showSearch
                placement="bottomRight"
                virtual={false}
                options={[
                  { label: "University 1", value: "1" },
                  { label: "University 2", value: "2" },
                  { label: "University 3", value: "3" },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex gap-10 wide">
            <Form.Item
              label="Faculties"
              name="facultyIds"
              rules={[{ required: true, message: "required" }]}
              className="formItem wide"
            >
              <Select
                mode="multiple"
                filterOption={false}
                size="large"
                placeholder="Select faculties"
                showSearch
                placement="bottomRight"
                virtual={false}
                options={[
                  { label: "Faculty 1", value: "1" },
                  { label: "Faculty 2", value: "2" },
                  { label: "Faculty 3", value: "3" },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex gap-10 wide">
            <Form.Item
              label="Programs"
              name="departmentIds"
              rules={[{ required: true, message: "required" }]}
              className="formItem wide"
            >
              <Select
                mode="multiple"
                filterOption={false}
                size="large"
                placeholder="Select programs"
                showSearch
                placement="bottomRight"
                virtual={false}
                options={[
                  { label: "Program 1", value: "1" },
                  { label: "Program 2", value: "2" },
                  { label: "Program 3", value: "3" },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex gap-10 wide">
            <Form.Item
              label="Academic Year"
              name="academicYear"
              className="formItem width-50"
            >
              <Input size="large" placeholder="Enter academic year" />
            </Form.Item>

            <Form.Item
              label="Available Seats"
              name="availableSeats"
              className="formItem width-50"
            >
              <InputNumber
                size="large"
                placeholder="Enter available seats"
                min={0}
                className="wide"
              />
            </Form.Item>
          </div>

          <div className="flex gap-10 wide">
            <Form.Item label="Cost" name="cost" className="formItem width-33">
              <InputNumber
                size="large"
                placeholder="Enter cost"
                min={0}
                className="wide"
                type="number"
              />
            </Form.Item>

            <Form.Item
              label="Sales Price"
              name="salesPrice"
              className="formItem width-33"
            >
              <InputNumber
                size="large"
                placeholder="Enter sales price"
                min={0}
                className="wide"
                type="number"
              />
            </Form.Item>

            <Form.Item
              label="Agent Price"
              name="agentPrice"
              className="formItem width-33"
            >
              <InputNumber
                size="large"
                placeholder="Enter agent price"
                min={0}
                className="wide"
                type="number"
              />
            </Form.Item>
          </div>

          <Flex justify="end" align="center" gap={10} className="mt_32">
            <Form.Item style={{ margin: 0 }}>
              <Button size="large" className="cancel">
                Cancel
              </Button>
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button htmlType="submit" type="primary" size="large">
                Create
              </Button>
            </Form.Item>
          </Flex>
        </Form>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Scrollable Container
          </h2>
          <p className="text-gray-600 mb-4">
            This container has a fixed height and scrollable content. Try
            scrolling to see the overscroll behavior.
          </p>

          {/* Scrollable div with high content */}
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <div
              ref={ref}
              className="h-[300px] overflow-y-auto bg-gradient-to-br from-blue-50 to-gray-50 p-4 custom-scrollbar"
            >
              {/* High content to make it scrollable */}
              {Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  className="mb-4 p-3 bg-white rounded border border-gray-200"
                >
                  <h3 className="font-medium text-gray-800 mb-2">
                    Content Section {index + 1}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    This is sample content to demonstrate scrolling. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  {index % 5 === 0 && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-blue-700 text-xs">
                      Special highlight for section {index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Instructions
          </h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              • Scroll within the container above to see the scrolling behavior
            </li>
            <li>
              • Notice how the content scrolls within the fixed-height container
            </li>
            <li>• This demonstrates the overscroll issue on iOS devices</li>
            <li>
              • The container has a height of 384px (h-96) with overflow-y-auto
            </li>
          </ul>
        </div>

        {/* Additional content to make body taller */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Additional Content for Body Height
          </h2>
          <p className="text-gray-600 mb-4">
            This section adds more content to the body element to ensure it has
            sufficient height for scrolling.
          </p>
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className="mb-3 p-3 bg-gray-50 rounded border border-gray-200"
            >
              <p className="text-gray-600 text-sm">
                Additional content block {index + 1} to increase body height and
                demonstrate scrolling behavior.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
