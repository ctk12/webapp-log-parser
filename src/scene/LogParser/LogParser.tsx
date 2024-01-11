import "./LogParser.scss";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import axios, { AxiosProgressEvent } from "axios";
import { TextNormalF } from "@/shared/Typography";
import { LogResponseType } from "@/types/LogResponse";

const LogParser = () => {
  const [data, setData] = useState<LogResponseType[]>([])
  const [parseLoading, setParseLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const reset = () => {
    setIsError(false);
    setParseLoading(false);
    setProgress(0);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    if (event.target.files) {
      if (event.target.files[0]?.name.slice(-4) !== ".log") {
        alert("Only allowed .log files");
        return;
      }
      setSelectedFile(event.target.files ? event.target.files[0] : null);
      reset();
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    setParseLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/log-parser", formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progress1 = progressEvent?.total ? Math.round((progressEvent.loaded / progressEvent?.total) * 100) : 0;
          setProgress(progress1);
        },
      });
      if (response.data.success) {
        setData(response.data.data);
      } else {
        reset();
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
      reset();
    }
    setParseLoading(false);
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedFile?.name.slice(0, -4)}.json`;

    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    if (selectedFile) {
      handleDownload();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Header name="Parse log file" />
      <div className="w-full max-w-xs">
        <form className="shadow-md rounded px-2 pt-6 pb-8 mb-4">
        <div className="mb-3">
          <label
            htmlFor="formFileLg"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >Large file input example
          </label>
          <input
            onChange={handleFileChange}
            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-slate-800 focus:border-primary focus:text-neutral-100 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            id="formFileLg"
            type="file" />
        </div>
          <TextNormalF className="mb-5">Only allowed .log files</TextNormalF>
          {progress > 0 && (
            <div className="w-full flex items-center gap-2 mb-5">
              <progress id="file" value={progress} max="100" style={{ color: "black" }}></progress> <span>
              <TextNormalF>{progress}% {progress < 100 ? "Uploding" : "Uploded"}</TextNormalF>
              </span>
            </div>
          )}
          {progress === 100 && !isError && (
            <div className="w-full flex items-center gap-2 mb-5">
              <TextNormalF>
                {parseLoading ? "Please wait Processing..." : "Log file parsed successfully and started downoading..." }
              </TextNormalF>
            </div>
          )}
          <div className="flex items-center justify-between mt-8">
            <button disabled={parseLoading} onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Parse log file
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogParser;