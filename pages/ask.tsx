import "twin.macro";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "~~/context/state";
import ErrorMessage from "~~/components/AlertError";
import { getErrorMsg } from "~~/utils/helperFuncs";

import TextField from "~~/components/my-mui/TextField";
import { ChipWithClose } from "~~/components/my-mui/Chips";
import Autocomplete from "~~/components/my-mui/AutoComplete";
import { Button, StyledAnchor } from "~~/components/my-mui/Misc";
import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
} from "~~/lib/__generated__/graphql";
import { Container } from "~~/components/Layout";
import { getValidation } from "~~/utils";
import RightSidePanel from "~~/components/Layout/RightSidePanel/dynamic";
import getMainLayout from "~~/components/Layout/getMainLayout";
import { useRouter } from "next/router";
import { useAuthContext } from "~~/context/auth";
import Link from "next/link";
import SEO from "~~/components/SEO";

interface BaseQuestionArgs {
  title: string;
  body: string;
}
const AskQuestionMain = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { editingQuestion, clearEdit, notify } = useAppContext();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(editingQuestion ? editingQuestion.tags : []);
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editingQuestion ? editingQuestion.title : "",
      body: editingQuestion ? editingQuestion.body : "",
    },
    mode: "onChange",
  });

  const [addQuestion, { loading: addQuesLoading }] = useAddQuestionMutation({
    onError: (err) => {
      setErrorMsg(getErrorMsg(err));
    },
  });

  const [updateQuestion, { loading: editQuesLoading }] =
    useUpdateQuestionMutation({
      onError: (err) => {
        setErrorMsg(getErrorMsg(err));
      },
    });

  const postQuestion = ({ title, body }: BaseQuestionArgs) => {
    if (tags.length === 0) return setErrorMsg("Atleast one tag must be added.");

    addQuestion({
      variables: { title, body, tags },
      update: (_, { data }) => {
        router.push(`/questions/${data?.postQuestion.id}`);
        reset();
        notify("Question posted!");
      },
    });
  };

  const editQuestion = ({ title, body }: BaseQuestionArgs) => {
    if (tags.length === 0) return setErrorMsg("Atleast one tag must be added.");

    updateQuestion({
      variables: { quesId: editingQuestion.quesId, title, body, tags },
      update: (_, { data }) => {
        router.push(`/questions/${data?.editQuestion.id}`);
        clearEdit();
        notify("Edit successful!");
      },
    });
  };
  const handleACInputChange = (value: string) => {
    const newInputValue = value.toLowerCase().trim();

    if (!/^[a-zA-Z0-9-]*$/.test(value)) {
      return setErrorMsg("Only alphanumeric characters & dash are allowed.");
    }
    if (newInputValue.length > 15) {
      return setErrorMsg("A single tag can't have more than 15 characters.");
    }

    setTagInput(newInputValue);
  };
  const handleACChange = (value: string[]) => {
    if (value.length < tags.length) {
      setTags(value);
      return;
    }
    if (value.length > 5) {
      setTagInput("");
      setErrorMsg("Max 5 tags can be added! Not more than that.");
      return;
    }
    if (tags.includes(tagInput)) {
      return setErrorMsg(
        "Duplicate tag found! You can't add the same tag twice."
      );
    }
    setTags(value);
  };
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <Container>
      <SEO title="Ask Question - Stack Underflow" />
      <Link
        href={
          editingQuestion?.quesId ? `/questions/${editingQuestion.quesId}` : "/"
        }
        passHref
      >
        <StyledAnchor> &lt; Back</StyledAnchor>
      </Link>
      <h1 tw="text-xl">
        {editingQuestion ? "Edit Your Question" : "Ask a public question"}
      </h1>
      <form
        tw="mt-4 "
        onSubmit={
          editingQuestion
            ? handleSubmit(editQuestion)
            : handleSubmit(postQuestion)
        }
      >
        <div tw="mb-4">
          <p tw=" text-xs md:text-sm mb-2">
            Be specific and imagine you’re asking a question to another person
          </p>
          <TextField
            tag="input"
            required
            fullWidth
            {...register("title", getValidation({ name: "title", min: 50 }))}
            placeholder="Enter atleast 50 characters"
            type="text"
            label="Title"
            error={"title" in errors}
            helperText={"title" in errors ? errors.title?.message : ""}
          />
        </div>
        <div tw="mb-4">
          <p tw="text-xs md:text-sm mb-2">
            Include all the information someone would need to answer your
            question
          </p>
          <TextField
            tag="textarea"
            required
            rows={5}
            fullWidth
            {...register("body", getValidation({ name: "body", min: 100 }))}
            placeholder="Enter atleast 100 characters"
            label="Body"
            error={"body" in errors}
            helperText={"body" in errors ? errors.body?.message : ""}
          />
        </div>
        <div tw="mb-4">
          <p tw="text-xs md:text-sm mb-2">
            Add up to 5 tags to describe what your question is about
          </p>
          <Autocomplete
            value={tags}
            inputValue={tagInput}
            onInputChange={(_, value) => {
              handleACInputChange(value);
            }}
            onChange={(_, value) => {
              handleACChange(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="press Enter to add tags"
                fullWidth
              />
            )}
            renderTags={(_, getTagProps) =>
              tags.map((option: string, index: number) => (
                <ChipWithClose
                  key={option}
                  label={option}
                  color="primary"
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </div>
        <Button
          type="submit"
          tw="text-sm sm:text-base"
          disabled={addQuesLoading || editQuesLoading}
        >
          {editingQuestion ? "Update Your Question" : "Post Your Question"}
        </Button>
        <ErrorMessage
          errorMsg={errorMsg}
          clearErrorMsg={() => setErrorMsg("")}
        />
      </form>
    </Container>
  );
};

export default function AskQuestionPage() {
  return (
    <>
      <AskQuestionMain />
      <RightSidePanel />
    </>
  );
}

AskQuestionPage.getLayout = getMainLayout;
