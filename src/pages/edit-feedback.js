import Head from "next/head";
import Image from "next/image";
import { Jost } from "next/font/google";
import styles from "@/styles/edit-feedback.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { SuggestionsCtx } from "@/context";
import React, { useEffect } from "react";

const inter = Jost({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { id } = router?.query;
  const { suggestions, setSuggestions } = React.useContext(SuggestionsCtx);

  const [item, setItem] = React.useState({});

  function search(nameKey, myArray) {
    console.log(nameKey, myArray);
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        setItem(myArray[i]);

        break;
      }
    }
  }

  useEffect(() => {
    search(id, suggestions);
  }, []);

  function updateArray() {
    for (var i in suggestions) {
      if (suggestions[i].id == id) {
        suggestions[i] = item;
        router.push("/");
        break; //Stop this loop, we found it!
      }
    }
  }

  var removeByAttr = function () {
    let suggestions_ = suggestions;
    for (var i in suggestions_) {
      if (suggestions[i].id == id) {
        suggestions_.splice(i, 1);

        break; //Stop this loop, we found it!
      }
    }
    setSuggestions(suggestions_);
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.feedbackCont}>
          <div onClick={() => router.back()} className={styles.back}>
            <span></span> Go Back
          </div>
          <div className={styles.feedback}>
            <span></span>
            <h4>Editing ‘{item?.title}’</h4>
            <div className={styles.input}>
              <div className={styles.input1}>
                <text>Feedback Title</text>
                <p>Add a short, descriptive headline</p>
                <input
                  value={item?.title}
                  onChange={(value) => {
                    setItem({
                      ...item,
                      title: value?.target?.value,
                    });
                  }}
                  type="text"
                  placeholder=""
                ></input>
              </div>
              <div className={styles.input2}>
                <text>Category</text>
                <p>Choose a category for your feedback</p>
                <select
                  value={item?.category}
                  onChange={(value) => {
                    setItem({
                      ...item,
                      category: value?.target?.value,
                    });
                  }}
                >
                  <option value="Feture">Feature</option>
                  <option value="UI">UI</option>
                  <option value="UX">UX</option>
                  <option value="Enhancement">Enhancement</option>
                  <option value="Bug">Bug</option>
                </select>
              </div>
              <div className={styles.input2}>
                <text>Update Status</text>
                <p>Change feedback state</p>
                <select
                  value={item?.status}
                  onChange={(value) => {
                    setItem({
                      ...item,
                      status: value?.target?.value,
                    });
                  }}
                >
                  <option value="Suggestion">Suggestion</option>
                  <option value="Planned">Planned</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Live">Live</option>
                </select>
              </div>
              <div className={styles.input3}>
                <text>Feedback Detail</text>
                <p>
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <textarea
                  value={item?.details}
                  onChange={(value) => {
                    setItem({
                      ...item,
                      details: value?.target?.value,
                    });
                  }}
                  type="text"
                />
              </div>
              <div className={styles.btns}>
                <button
                  onClick={() => {
                    removeByAttr();
                  }}
                  className={styles.btn3}
                >
                  Delete
                </button>
                <div className={styles.rightbtns}>
                  <button className={styles.btn1}
                    onClick={() => router.back()}
                  >Cancel</button>
                  <button
                    onClick={() => {
                      updateArray();
                    }}
                    className={styles.btn2}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
