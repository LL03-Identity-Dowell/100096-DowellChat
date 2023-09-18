import Select from "react-select";
import DataContext from "../../context/data-context";
import { useContext, useEffect, useState } from "react";
import { availableProducts } from "../../utils/constants";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const InvitePopup = ({
  isLoading,
  handleShowInvitePopup,
  handelInvite,
  masterLinks,
  qrImage,
}) => {
  const { userportfolio, orgId } = useContext(DataContext).collectedData;
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [idCount, setIdCount] = useState(0);
  const [step, setStep] = useState("select number");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qrIds, setQrIds] = useState([]);
  const [key, setKey] = useState(0);

  //   const navigate = useNavigate();

  const tabs = ["select number", "show QR"];

  useEffect(() => {
    axios
      .post(`https://100096.pythonanywhere.com/api/v2/get_QR_Id/${orgId}/`)
      .then((response) => {
        setQrIds(response.data.qr_id_list);
      });
  }, [orgId]);

  useEffect(() => {
    setKey(idCount);
  }, [idCount]);

  useEffect(() => {
    <Select
      key={idCount}
      options={selectOptions}
      defaultValue={selectedOptions}
      className="basic-multi-select w-4/5 h-20 overflow-auto outline-none"
      classNamePrefix="select"
      isMulti
      isSearchable={false}
      onChange={(value) => {
        setSelectedIds(value.map((item) => item.value.toString()));
      }}
    />;
  }, [idCount, selectOptions, selectedOptions]);

  useEffect(() => {
    if (masterLinks?.length) {
      setStep("");
    }
  }, [masterLinks]);

  useEffect(() => {
    if (masterLinks.length > 0) {
      setStep("show QR");
    }
  }, [masterLinks]);

  useEffect(() => {
    const options = [];
    for (let i = 0; i < userportfolio?.length; i++) {
      if (userportfolio[i].member_type === "public") {
        for (let j = 0; j < userportfolio[i].username.length; j++) {
          if (true) {
            options.push({
              value: userportfolio[i].username[j],
              label: userportfolio[i].username[j],
              portfolioName: userportfolio[i].portfolio_name,
            });
          }
        }
      }
    }
    if (options.length > idCount) {
      const selectedOption = [];
      for (let i = 0; i < idCount; i++) {
        selectedOption.push(options[i]);
      }
      setSelectOptions(options);
      setSelectedOptions(selectedOption);
      setSelectedIds(
        selectedOption.map((item) => ({
          qrid: item.value,
          portfolioName: item.portfolioName,
        }))
      );
    } else {
      setSelectOptions(options);
      setSelectedOptions(options);
      setSelectedIds(
        options.map((item) => ({
          qrid: item.value,
          portfolioName: item.portfolioName,
        }))
      );
    }
  }, [idCount, qrIds, userportfolio]);
  const handleTabChange = (tabName) => {
    setStep(tabName);
  };

  const handleCopyClick = () => {
    const copyTextElement = document.getElementById("copyText");

    const range = document.createRange();
    range.selectNode(copyTextElement);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand("copy");
      //   console.log("Text copied to clipboard");
    } catch (error) {
      console.error("Unable to copy text:", error);
    }

    selection.removeAllRanges();
    // navigate(copyTextElement.innerText, { replace: true });
  };
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm">
        {isLoading ? (
          <div className="flex fixed w-[600px] min-h-[288px] justify-center items-center bg-gray-100 rounded-lg top-1/2 left-1/2 h-56 max-w-96 shadow-lg -translate-x-1/2 -translate-y-1/2">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="flex fixed w-[600px] min-h-[288px] pt-4 pb-4 flex-col gap-10 bg-gray-100 rounded-lg top-1/2 left-1/2  max-w-96 shadow-lg -translate-x-1/2 -translate-y-1/2">
            <div
              className={`flex w-full ${
                step !== "select number" && masterLinks?.length === 0
                  ? "justify-between"
                  : "justify-end"
              } px-5 pb-3`}
            >
              {step !== "select number" && masterLinks?.length === 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500 hover:cursor-pointer"
                  onClick={() => {
                    handleTabChange(
                      tabs[tabs.findIndex((item) => item === step) - 1]
                    );
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500 hover:cursor-pointer"
                onClick={() => {
                  setStep("select number");

                  handleShowInvitePopup();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="flex flex-col w-full justify-center h-max items-center">
              {userportfolio?.length > 0 ? (
                <>
                  {step === "select number" && (
                    <>
                      <div className="mb-5 pr-6">
                        <h1 className="text-lg font-bold text-green-700">
                          Share Public Chat
                        </h1>
                      </div>

                      <div className="flex flex-col w-full justify-center items-center">
                        <div className="flex flex-col w-4/5 mb-2">
                          <label className="mb-2" htmlFor="selectNumber">
                            Number of Ids
                            <strong className="text-red-600">*</strong>
                          </label>
                          <input
                            name="selectNumber"
                            type="number"
                            value={idCount}
                            min={1}
                            required
                            placeholder="Enter Number of Ids"
                            onChange={(event) => {
                              setIdCount(event.target.value);
                            }}
                            className="h-11 p-2 border outline-none"
                          />
                        </div>
                        <div className="flex flex-col w-4/5 mb-2">
                          <label className="mb-2" htmlFor="availableIds">
                            Select id{" "}
                            <strong className="text-red-600">*</strong>
                          </label>
                          <Select
                            key={`select_${key}`}
                            options={selectOptions}
                            defaultValue={
                              selectedOptions.length && selectedOptions
                            }
                            className="basic-multi-select outline-none"
                            classNamePrefix="select"
                            isMulti
                            isSearchable={false}
                            onChange={(value) => {
                              setSelectedIds(
                                value.map((item) => item.value.toString())
                              );
                            }}
                          />
                          {selectOptions.length < idCount && (
                            <span className="text-red-500 pt-1">
                              Not Enough Available IDs only{" "}
                              {selectOptions.length} IDs are selected.
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col w-4/5 mb-2">
                          <label className="pb-2" htmlFor="selectName">
                            Available Products
                            <strong className="text-red-600">*</strong>
                          </label>
                          <select
                            defaultValue=""
                            onChange={(event) => {
                              setSelectedProduct(event.target.value);
                            }}
                            className="h-11 p-2 border outline-none"
                          >
                            <option value="">Select Product Name</option>
                            {availableProducts.map((item, index) => (
                              <option key={index} value={item.productName}>
                                {item.productName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button
                        className="btn-primary"
                        disabled={
                          selectedIds.length === 0 || selectedProduct === ""
                        }
                        onClick={() => {
                          const product = availableProducts.filter(
                            (item) => item.productName === selectedProduct
                          )[0];
                          const obj = {};
                          obj[product.productName] = product.id;
                          handelInvite(selectedIds, obj);
                        }}
                      >
                        Generate QR
                      </button>
                    </>
                  )}
                  {step === "show QR" && masterLinks?.length > 0 && (
                    <>
                      <img src={qrImage} alt="QR" width={200} height={20} />
                      <div className="flex w-[550px] pl-2 mx-4 items-center justify-between border border-gray-300">
                        <span
                          id="copyText"
                          className=" whitespace-nowrap block  overflow-hidden text-ellipsis"
                        >
                          {masterLinks}
                        </span>
                        <button
                          className="bg-blue-600 p-2 text-white"
                          onClick={handleCopyClick}
                        >
                          Copy
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="flex w-full mt-12 justify-center items-center">
                    <span>No ids found in portfolio.</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
