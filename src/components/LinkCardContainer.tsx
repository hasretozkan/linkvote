import * as React from "react";
import { useMutation } from "react-query";
import { Button, Modal } from "react-bootstrap";
import { deleteLink, vote } from "../services/api";
import { SerializedLink } from "../services/models";
import LinkCard from "./LinkCard";
import Icon from "./Icon";
import { ShowToastFunction } from "../App";

type LinkCardContainerProps = {
  refetchList: () => void;
  showToast: ShowToastFunction;
} & SerializedLink;

const LinkCardContainer: React.FC<LinkCardContainerProps> = ({ refetchList, showToast, ...link }) => {
  const [modalShown, setModalShown] = React.useState(false);
  const handleClose = () => setModalShown(false);

  const { mutate: upVote, isLoading: isUpVoteLoading } = useMutation(() => vote({ type: "upvote", id: link.id }), {
    onSuccess: () => {
      refetchList();
    },
  });

  const { mutate: downVote, isLoading: isDownVoteLoading } = useMutation(() => vote({ type: "downvote", id: link.id }), {
    onSuccess: () => {
      refetchList();
    },
  });

  const { mutate: deleteLinkFn, isLoading: isDeleteLoading } = useMutation(() => deleteLink(link.id), {
    onSuccess: () => {
      handleClose();
      refetchList();
      setTimeout(() => showToast("success", `${link.name} removed.`), 500);
    },
    onError: () => {
      handleClose();

      setTimeout(() => showToast("error", `An error occurred while deleting ${link.name}.`), 500);
    },
  });

  return (
    <>
      <LinkCard
        {...link}
        handleUpVoteClick={isUpVoteLoading ? undefined : upVote}
        handleDownVoteClick={isDownVoteLoading ? undefined : downVote}
        handleDeleteClick={() => setModalShown(true)}
        isDownVoteLoading={isDownVoteLoading}
        isUpVoteLoading={isUpVoteLoading}
        isDeleteLoading={isDeleteLoading}
      />
      <Modal show={modalShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to remove: <b>{link.name}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" disabled={isDeleteLoading} onClick={() => deleteLinkFn()} className="d-flex justify-content-center align-items-center">
            Delete
            {isDeleteLoading && <Icon name="loader" size={16} className="text-white ml-2" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LinkCardContainer;
