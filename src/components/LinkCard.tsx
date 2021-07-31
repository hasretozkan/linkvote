import * as React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { SerializedLink } from "../services/models";
import Icon from "./Icon";

type LinkButtonProps = {
  onClick?: () => void;
  text: string;
  loading: boolean;
  icon: "up" | "down";
};

// NOTE Up Vote, Down Vote Butonları
const LinkButton: React.FC<LinkButtonProps> = ({ onClick, text, loading, icon }) => (
  <p className="text-primary cursor-pointer user-select-none mb-0 bold-font set-center-vertical" onClick={onClick}>
    <Icon name={loading ? "loader" : icon === "down" ? "arrowDown" : "arrowUp"} size={24} className="text-primary" />
    <span className="ml-1">{text}</span>
  </p>
);

type LinkCardProps = {
  handleUpVoteClick?: () => void;
  handleDeleteClick?: () => void;
  handleDownVoteClick?: () => void;
  isUpVoteLoading?: boolean;
  isDeleteLoading?: boolean;
  isDownVoteLoading?: boolean;
} & SerializedLink;

const LinkCard: React.FC<LinkCardProps> = ({ url, name, score, handleDownVoteClick, handleUpVoteClick, handleDeleteClick, isDownVoteLoading, isUpVoteLoading, isDeleteLoading }) => (
  <Card className="mt-2 mb-2 mw-100 w-100 position-relative link-card">
    <Card.Body>
      <Row>
        <Col sm={3} xs={12} className="mb-4 mb-sm-0">
          <div className="border mr-3 rounded d-flex justify-content-center align-items-center score-card">
            <span>{score}</span>
            <span>Points</span>
          </div>
        </Col>
        
        <Col sm={9} xs={12}>
          <Card.Title className="mb-1 text-ellipsis bold-font">{name}</Card.Title>
          <small className="mb-2 text-muted text-ellipsis d-block">({url})</small>
          <Row className="mt-2">
            <Col sm={6} xs={12}>
              <LinkButton text="Up Vote" loading={!!isUpVoteLoading} onClick={handleUpVoteClick} icon="up" />
            </Col>
            <Col sm={6} xs={12}>
              <LinkButton text="Down Vote" loading={!!isDownVoteLoading} onClick={handleDownVoteClick} icon="down" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card.Body>
    <Icon name={isDeleteLoading ? "loader" : "trash"} onClick={handleDeleteClick} size={16} className="link-trash" />
  </Card>
);

export default LinkCard;
