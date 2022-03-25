import React from 'react';
import { graphql } from 'gatsby';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { Link, ListItemButton } from 'gatsby-theme-material-ui';
// import { useTheme } from '@mui/styles';
import { visuallyHidden } from '@mui/utils';
import FeedIcon from '@mui/icons-material/Feed';
import Layout from '../Layout/Layout';
import AdventureDetails from '../AdventureDetails/AdventureDetails';
import {
  NPCS, HEADER_CELLS, LOCATIONS, BLOCK_HEADER_STYLES,
} from '../../utils/constants';

// const dmcmTheme = () => useTheme();

function NpcTable({ npcs, headers }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = npcs.map((row) => row.node.frontmatter);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = () => (
    order === 'desc'
      ? (a, b) => descendingComparator(a, b)
      : (a, b) => -descendingComparator(a, b)
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Paper
        elevation={5}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h3"
          sx={BLOCK_HEADER_STYLES}
        >
          {NPCS}
          <Divider />
        </Typography>
        <TableContainer>
          <Table>
            <NpcTableHead
              headers={headers}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <NpcTableBody
              npcs={npcs}
              page={page}
              order={order}
              orderBy={orderBy}
              emptyRows={emptyRows}
              rows={rows}
              rowsPerPage={rowsPerPage}
              getComparator={getComparator}
            />
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
}

function NpcTableHead({
  headers, onRequestSort, order, orderBy,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headers.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function NpcTableBody({
  emptyRows, getComparator, order, orderBy, page, rows, rowsPerPage,
}) {
  return (
    <TableBody>
      {rows.slice().sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow
            hover
            tabIndex={-1}
            key={row.name}
          >
            {[
              row.name,
              row.race,
              row.location,
              row.occupation,
              row.age,
              row.stats,
              row.emotion,
              row.motive,
              row.voice,
            ].map((cell) => {
              if (cell === row.stats) {
                return (
                  <TableCell key={Math.random()} align="left">
                    <Link
                      to="/search/?category=monsters"
                      state={{
                        query: cell,
                      }}
                    >
                      <FeedIcon
                        sx={{
                          color: 'common.white',
                        }}
                      />
                    </Link>
                  </TableCell>
                );
              }
              return (
                <TableCell
                  key={Math.random()}
                  align={cell === row.age ? 'right' : 'left'}
                >
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 75 * emptyRows,
          }}
        >
          <TableCell colSpan={9} />
        </TableRow>
      )}
    </TableBody>
  );
}

function Locations({ locations, parentAdventureSlug, parentAdventureTitle }) {
  return (
    <Box>
      <Paper
        sx={{
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h3"
          sx={BLOCK_HEADER_STYLES}
        >
          {LOCATIONS}
        </Typography>
        <Divider />
        <List
          sx={{
            padding: 0,
          }}
        >
          {locations.map((location) => (
            <ListItem disablePadding key={location.node.frontmatter.title}>
              <Link
                component={ListItemButton}
                underline="none"
                to={location.node.fields.slug}
                state={{
                  parentAdventureSlug,
                  parentAdventureTitle,
                }}
                sx={{
                  color: 'primary.light',
                }}
              >
                <ListItemText primary={location.node.frontmatter.title} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

function AdventurePageLayout({ data }) {
  return (
    <Layout title={data.mdx.frontmatter.title}>
      <Stack
        sx={{
          rowGap: 2,
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            overflow: 'hidden',
          }}
        >
          <AdventureDetails
            body={data.mdx.body}
            levels={data.mdx.frontmatter.levels}
            players={data.mdx.frontmatter.playernum}
            setting={data.mdx.frontmatter.setting}
            direction="column-reverse"
          />
        </Paper>
        <NpcTable
          npcs={data.npcs.edges}
          headers={HEADER_CELLS}
        />
        <Locations
          locations={data.locations.edges}
          parentAdventureSlug={data.mdx.fields.slug}
          parentAdventureTitle={data.mdx.frontmatter.title}
        />
      </Stack>
    </Layout>
  );
}

export const query = graphql`
  query AdventurePageQuery($id: String, $locations: String, $npcs: String) {
    mdx(id: {eq: $id}) {
      id
      body
      frontmatter {
        title
        icon
        levels
        playernum
        setting
        links {
          url
          title
        }
        image {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
      fields {
        slug
      }
    }
    locations: allMdx(
      filter: {fields: {slug: {regex: $locations}}}
      sort: {fields: frontmatter___title}
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    npcs: allMdx(
      filter: {fields: {slug: {regex: $npcs}}}
      sort: {fields: frontmatter___name}
    ) {
      edges {
        node {
          id
          body
          frontmatter {
            name
            race
            location
            occupation
            age
            emotion
            stats
            motive
            voice
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default AdventurePageLayout;
