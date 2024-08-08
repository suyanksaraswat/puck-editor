import type { Config } from "@measured/puck";
import React from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

type FormField = {
  Label: string;
  Type: string;
  Name: string;
  Id: string;
  Placeholder: string;
  Required?: boolean;
  Value?: string;
  Disabled?: boolean;
  ReadOnly?: boolean;
  Options?: {
    Label: string;
    Value: string;
  }[];
};

type Props = {
  HeadingBlock: { title: string };
  Form: {
    fields: FormField[];
    buttonText: string;
    FormAction?: string;
    FormMethod?: string;
    FormTarget?: string;
  };
};

const formStyle = {
  maxWidth: "500px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#333",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background-color 0.3s ease",
};

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  for (const [name, value] of formData.entries() as any) {
    console.log(`${name}:${value}`);
  }
}

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1 className={classNames("text-sm bg-green-400", inter.className)}>
            {title}
          </h1>
        </div>
      ),
    },
    Form: {
      fields: {
        fields: {
          type: "array",
          arrayFields: {
            Type: {
              type: "select",
              options: [
                { label: "Button", value: "button" },
                { label: "Checkbox", value: "checkbox" },
                { label: "Color", value: "color" },
                { label: "Date", value: "date" },
                { label: "Datetime-local", value: "datetime-local" },
                { label: "Email", value: "email" },
                { label: "File", value: "file" },
                { label: "Hidden", value: "hidden" },
                { label: "Image", value: "image" },
                { label: "Month", value: "month" },
                { label: "Number", value: "number" },
                { label: "Password", value: "password" },
                { label: "Radio", value: "radio" },
                { label: "Range", value: "range" },
                { label: "Tel", value: "tel" },
                { label: "Text", value: "text" },
                { label: "Time", value: "time" },
                { label: "URL", value: "url" },
                { label: "Week", value: "week" },
              ],
            },
            Label: { type: "text" },
            Name: { type: "text" },
            Id: { type: "text" },
            Placeholder: { type: "text" },
            Required: {
              type: "select",
              options: [
                { label: "True", value: "true" },
                { label: "False", value: "false" },
              ],
            },
            Value: { type: "text" },
            Disabled: {
              type: "select",
              options: [
                { label: "False", value: "false" },
                { label: "True", value: "true" },
              ],
            },
            ReadOnly: {
              type: "select",
              options: [
                { label: "False", value: "false" },
                { label: "True", value: "true" },
              ],
            },
            Options: {
              type: "array",
              arrayFields: {
                Label: { type: "text" },
                Value: { type: "text" },
              },
            },
          },
          getItemSummary: (item) => item.Label || "Unnamed Field",
        },
        buttonText: { type: "text" },
        FormAction: { type: "text" },
        FormMethod: {
          type: "select",
          options: [
            { label: "POST", value: "post" },
            { label: "GET", value: "get" },
          ],
        },
        FormTarget: {
          type: "select",
          options: [
            { label: "_self", value: "_self" },
            { label: "_blank", value: "_blank" },
            { label: "_parent", value: "_parent" },
            { label: "_top", value: "_top" },
          ],
        },
      },
      defaultProps: {
        fields: [
          {
            Label: "Email",
            Type: "email",
            Name: "email",
            Id: "email",
            Placeholder: "Enter your email",
          },
        ],
        buttonText: "Login",
      },
      render: ({ fields, buttonText, FormAction, FormMethod, FormTarget }) => {
        return (
          <div className={inter.className} style={formStyle}>
            <form
              action={FormAction}
              method={FormMethod}
              target={FormTarget}
              onSubmit={handleSubmit}
            >
              {fields.map((field, index) => (
                <div key={index}>
                  <label htmlFor={field.Id} style={labelStyle}>
                    {field.Label}
                  </label>
                  {field.Type == "checkbox" ? (
                    <div>
                      {field?.Options?.map(({ Label, Value }, index) => (
                        <div key={index}>
                          <input
                            type={field.Type}
                            name={field.Name}
                            readOnly={field.ReadOnly}
                            required={field.Required}
                            disabled={field.Disabled}
                            value={Value}
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              fontSize: "16px",
                              boxSizing: "border-box",
                              marginBottom: "15px",
                            }}
                          />
                          <span>{Label}</span>
                        </div>
                      ))}
                    </div>
                  ) : field.Type == "radio" ? (
                    <div>
                      {field?.Options?.map(({ Label, Value }, index) => (
                        <div key={index}>
                          <input
                            type={field.Type}
                            name={field.Name}
                            readOnly={field.ReadOnly}
                            required={field.Required}
                            disabled={field.Disabled}
                            value={Value}
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              fontSize: "16px",
                              boxSizing: "border-box",
                              marginBottom: "15px",
                            }}
                          />
                          <span>{Label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.Type}
                      name={field.Name}
                      id={field.Id}
                      placeholder={field.Placeholder}
                      readOnly={field.ReadOnly}
                      required={field.Required}
                      disabled={field.Disabled}
                      value={field.Value}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        marginBottom: "15px",
                      }}
                    />
                  )}
                </div>
              ))}
              <button type="submit" style={buttonStyle}>
                {buttonText}
              </button>
            </form>
          </div>
        );
      },
    },
  },
};

export default config;
