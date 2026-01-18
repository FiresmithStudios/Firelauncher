import axios from 'axios';
import { AppMetadata, VersionMetadata } from '../../shared/types';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

export class GitHubService {
  private owner: string;
  private repo: string;
  private branch: string;

  constructor(owner: string = 'FiresmithStudios', repo: string = 'Firelauncher', branch: string = 'main') {
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
  }

  /**
   * Get the raw content URL for a file in the repository
   */
  private getRawUrl(path: string): string {
    return `${GITHUB_RAW_BASE}/${this.owner}/${this.repo}/${this.branch}/${path}`;
  }

  /**
   * Get the GitHub API URL for repository contents
   */
  private getApiUrl(path: string = ''): string {
    return `${GITHUB_API_BASE}/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`;
  }

  /**
   * Fetch JSON content from a raw GitHub URL
   */
  private async fetchJson<T>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching JSON from ${url}:`, error);
      throw error;
    }
  }

  /**
   * List directories in a path
   */
  private async listDirectories(path: string): Promise<string[]> {
    try {
      const response = await axios.get(this.getApiUrl(path));
      const items = Array.isArray(response.data) ? response.data : [];
      return items
        .filter((item: any) => item.type === 'dir')
        .map((item: any) => item.name);
    } catch (error: any) {
      // 404 means the directory doesn't exist, which is fine - return empty array
      if (error.response?.status === 404) {
        return [];
      }
      console.error(`Error listing directories in ${path}:`, error.message);
      return [];
    }
  }

  /**
   * Scan the repository for all applications
   */
  async scanRepository(): Promise<AppMetadata[]> {
    const apps: AppMetadata[] = [];

    // Scan both 'applications' and 'games' directories
    const categories = ['applications', 'games'];
    
    for (const category of categories) {
      try {
        const appIds = await this.listDirectories(category);
        
        for (const appId of appIds) {
          try {
            const metadata = await this.getAppMetadata(category, appId);
            if (metadata) {
              apps.push(metadata);
            }
          } catch (error: any) {
            // Silently skip apps with missing metadata
            if (error.response?.status !== 404) {
              console.error(`Error fetching metadata for ${category}/${appId}:`, error.message);
            }
          }
        }
      } catch (error: any) {
        // Directory doesn't exist is fine, only log other errors
        if (error.response?.status !== 404) {
          console.error(`Error scanning ${category} directory:`, error.message);
        }
      }
    }

    return apps;
  }

  /**
   * Get application metadata
   */
  async getAppMetadata(category: string, appId: string): Promise<AppMetadata | null> {
    try {
      const metadataPath = `${category}/${appId}/metadata.json`;
      const metadata = await this.fetchJson<AppMetadata>(this.getRawUrl(metadataPath));
      return metadata;
    } catch (error) {
      console.error(`Error fetching app metadata for ${category}/${appId}:`, error);
      return null;
    }
  }

  /**
   * Get version metadata
   */
  async getVersionMetadata(category: string, appId: string, versionFolder: string): Promise<VersionMetadata | null> {
    try {
      const metadataPath = `${category}/${appId}/${versionFolder}/metadata.json`;
      const metadata = await this.fetchJson<VersionMetadata>(this.getRawUrl(metadataPath));
      return metadata;
    } catch (error) {
      console.error(`Error fetching version metadata for ${category}/${appId}/${versionFolder}:`, error);
      return null;
    }
  }

  /**
   * Get download URL for a version (from metadata)
   */
  getDownloadUrl(metadata: VersionMetadata): string {
    return metadata.downloadUrl;
  }
}
