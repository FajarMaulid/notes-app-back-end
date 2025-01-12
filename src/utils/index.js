const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  createdAtTemp,
  updatedAtTemp,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: createdAtTemp,
  updatedAt: updatedAtTemp,
});

module.exports = { mapDBToModel };
