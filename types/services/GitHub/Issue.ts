import type { Endpoints } from '@octokit/types'

export type GetRepositoryIssues =
  Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data']

export type GetRepositoryIssue = GetRepositoryIssues[number]

export type GetRepositoryIssuesParameters =
  Endpoints['GET /repos/{owner}/{repo}/issues']['parameters']
