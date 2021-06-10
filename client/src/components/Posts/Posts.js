import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? (
      <Grid className={classes.grid} item xs={12} sm={8} md={8}>
        <CircularProgress />
      </Grid>
    ) : (
      <Grid className={classes.grid2} item xs={12} sm={8} md={8}>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  );
};

export default Posts;
