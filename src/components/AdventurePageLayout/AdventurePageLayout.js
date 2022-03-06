import * as React from 'react';
import { graphql } from 'gatsby';
import {
  Box,
  List,
  ListItem,
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
import { visuallyHidden } from '@mui/utils';
import { useTheme } from '@mui/styles';
import { Link } from 'gatsby-theme-material-ui';
import Layout from '../Layout/Layout';
import AdventureDetails from '../AdventureDetails/AdventureDetails';
import { HEADER_CELLS } from '../../utils/constants';

function EnhancedTableHead(props) {
  const theme = useTheme();
  const {
    order, orderBy, onRequestSort, headers,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        background: theme.palette.primary.main,
      }}
    >
      <TableRow>
        {headers.map((cell) => (
          <TableCell
            key={Math.random()}
            align={cell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === cell.id ? order : false}
            sx={{
              borderColor: theme.palette.tertiary.main,
            }}
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

const titleBarStyles = {
  my: 4,
};

const h3Styles = (theme) => (
  {
    background: theme.palette.primary.main,
    px: 2,
    pt: 1,
    fontWeight: 500,
  }
);

function NpcTable(props) {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { headerCells, npcData } = props;
  const rows = npcData.map((row) => row.node.frontmatter);

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
    <Box sx={titleBarStyles}>
      <Typography
        variant="h3"
        sx={h3Styles(theme)}
      >
        NPCs
      </Typography>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headers={headerCells}
          />
          <TableBody>
            {rows.slice().sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.name}
                  color={theme.palette.tertiary.main}
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
                  ].map((cell) => (
                    <TableCell
                      color={theme.palette.tertiary.main}
                      key={Math.random()}
                      align={cell === row.age ? 'right' : 'left'}
                      sx={{
                        color: theme.palette.tertiary.main,
                        borderColor: theme.palette.tertiary.main,
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
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
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          background: theme.palette.primary.main,
        }}
      />
    </Box>
  );
}

function AdventurePageLayout(props) {
  const { data } = props;
  console.log(data);
  const theme = useTheme();
  const locationListItems = (locations) => {
    const locationMarkup = locations && locations.map((location) => (
      <Typography key={Math.random()} variant="body1" component={ListItem}>
        <Link
          to={location.node.fields.slug}
          state={{
            parentAdventureSlug: data.mdx.fields.slug,
            parentAdventureTitle: data.mdx.frontmatter.title,
          }}
        >
          {location.node.frontmatter.title}
        </Link>
      </Typography>
    ));
    return locationMarkup;
  };

  return (
    <Layout title={data.mdx.frontmatter.title}>
      <AdventureDetails
        body={data.mdx.body}
        levels={data.mdx.frontmatter.levels}
        players={data.mdx.frontmatter.playernum}
        setting={data.mdx.frontmatter.setting}
        direction="column-reverse"
      />
      <NpcTable
        npcData={data.npcs.edges}
        headerCells={HEADER_CELLS}
      />
      <Box sx={titleBarStyles}>
        <Typography variant="h3" sx={h3Styles(theme)}>
          Locations
        </Typography>
        <List>
          {locationListItems(data.locations.edges)}
        </List>
      </Box>
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
