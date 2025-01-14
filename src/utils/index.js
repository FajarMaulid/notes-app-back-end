const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  createdAtTemp,
  updatedAtTemp,
  username,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: createdAtTemp,
  updatedAt: updatedAtTemp,
  username,
});

module.exports = { mapDBToModel };
